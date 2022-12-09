package org.icij.datashare.web;

import net.codestory.http.filters.basic.BasicAuthFilter;
import org.icij.datashare.PropertiesProvider;
import org.icij.datashare.Repository;
import org.icij.datashare.UserEvent;
import org.icij.datashare.session.LocalUserFilter;
import org.icij.datashare.user.User;
import org.icij.datashare.web.testhelpers.AbstractProdWebServerTest;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.net.URI;

import static java.util.Collections.singletonList;
import static org.icij.datashare.UserEvent.Type.DOCUMENT;
import static org.icij.datashare.session.DatashareUser.singleUser;
import static org.icij.datashare.text.Project.project;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class UserResourceTest extends AbstractProdWebServerTest {
    @Mock Repository repository;

    @Before
    public void setUp() {
        initMocks(this);
        configure(routes -> routes.add(new UserResource(repository)).filter(new LocalUserFilter(new PropertiesProvider())));
    }

    @Test
    public void get_user_information_test() {
        configure(routes -> routes.add(new UserResource(repository)).
                        filter(new BasicAuthFilter("/", "icij", singleUser("pierre"))));

        get("/api/users/me").withPreemptiveAuthentication("pierre", "pass").
                should().respond(200).contain("\"uid\":\"pierre\"");
    }

    @Test
    public void test_get_user_history() {
        UserEvent userEvent = new UserEvent(User.local(), DOCUMENT, "doc_name", URI.create("doc_uri"));
        when(repository.getUserEvents(User.local(), DOCUMENT, 0, 10)).thenReturn(singletonList(userEvent));
        when(repository.getTotalUserEvents(User.local(), DOCUMENT)).thenReturn(1);

        get("/api/users/me/history?type=document&from=0&size=10").should().contain(userEvent.uri.toString()).contain(User.local().id).contain("\"total\":1").respond(200);
    }

    @Test
    public void test_put_user_event_to_history() {
        when(repository.addToHistory(eq(singletonList(project("prj"))),any(UserEvent.class))).thenReturn(true);

        put("/api/users/me/history", "{\"type\": \"SEARCH\", \"projectIds\": [\"prj\"], \"name\": \"foo AND bar\", \"uri\": \"search_uri\"}").should().respond(200);
    }

    @Test
    public void test_delete_user_history_by_type() {
        when(repository.deleteUserHistory(User.local(), DOCUMENT)).thenReturn(true).thenReturn(false);

        delete("/api/users/me/history?type=search").should().respond(404);
        delete("/api/users/me/history?type=document").should().respond(200);
        delete("/api/users/me/history?type=document").should().respond(404);
    }

    @Test
    public void test_delete_user_event_by_id() {
        when(repository.deleteUserEvent(User.local(), 1)).thenReturn(true).thenReturn(false);

        delete("/api/users/me/history/event?id=7").should().respond(404);
        delete("/api/users/me/history/event?id=1").should().respond(200);
        delete("/api/users/me/history/event?id=1").should().respond(404);
    }
}
