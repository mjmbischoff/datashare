package org.icij.datashare.nlp;

import org.icij.datashare.text.Document;
import org.icij.datashare.text.Language;
import org.icij.datashare.text.indexing.Indexer;
import org.icij.datashare.text.nlp.AbstractPipeline;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import static java.util.Collections.emptyList;
import static org.icij.datashare.text.DocumentBuilder.createDoc;
import static org.icij.datashare.text.Language.ENGLISH;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.openMocks;

public class NlpConsumerTest {
    @Mock private Indexer indexer;
    @Mock private AbstractPipeline pipeline;
    private NlpConsumer nlpListener;

    @Before
    public void setUp() {
        openMocks(this);
        nlpListener = new NlpConsumer(pipeline, indexer, 32);
    }

    @Test
    public void test_on_message_does_nothing__when_doc_not_found_in_index() throws Exception {
        nlpListener.findNamedEntities("projectName","unknownId", "routing");

        verify(pipeline, never()).initialize(any(Language.class));
        verify(pipeline, never()).process(any());
    }

    @Test
    public void test_on_message_do_not_processNLP__when_init_fails() throws Exception {
        when(pipeline.initialize(any())).thenReturn(false);
        when(indexer.get(anyString(), anyString(), anyString())).thenReturn(createDoc("content").build());

        nlpListener.findNamedEntities("projectName","id", "routing");
        verify(pipeline, never()).process(any());
    }

    @Test
    public void test_on_message_processNLP__when_doc_found_in_index() throws Exception {
        when(pipeline.initialize(any())).thenReturn(true);
        Document doc = createDoc("content").build();
        when(pipeline.process(doc)).thenReturn(emptyList());
        when(indexer.get("projectName", doc.getId(), "routing")).thenReturn(doc);

        nlpListener.findNamedEntities("projectName", doc.getId(), "routing");

        verify(pipeline).initialize(ENGLISH);
        verify(pipeline).process(doc);
    }

    @Test
    public void test_on_message_process__chunked_doc_when_doc_is_large()  throws Exception  {
        when(pipeline.initialize(any())).thenReturn(true);
        Document doc = createDoc("huge_doc").with("0123456789abcdef0123456789abcdef+").build();
        when(pipeline.process(doc)).thenReturn(emptyList());
        when(indexer.get("projectName", doc.getId(), "routing")).thenReturn(doc);

        nlpListener.findNamedEntities("projectName", doc.getId(), "routing");

        verify(pipeline).initialize(ENGLISH);
        verify(pipeline).process(doc, 32, 0);
        verify(pipeline).process(doc, 32, 32);
    }
}
