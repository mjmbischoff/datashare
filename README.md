# Datashare

[![CircleCI](https://circleci.com/gh/ICIJ/datashare.svg?style=shield)](https://circleci.com/gh/ICIJ/datashare)
[![Crowdin](https://badges.crowdin.net/datashare/localized.svg)](https://crowdin.com/project/datashare)

## Download

https://datashare.icij.org/

## Documentation

Datashare's user guide can be found here: https://icij.gitbook.io/datashare/

## Follow new updates and features

[@ICIJorg](https://twitter.com/ICIJorg) publishes video tweets of new features with the hashtag [#ICIJDatashare](https://twitter.com/hashtag/ICIJDatashare).

## Frontend

This repository is only the backend part of Datashare.

Please find the frontend here : https://github.com/ICIJ/datashare-client.


## Description

Datashare is a free open-source desktop application developed by non-profit International Consortium of Investigative Journalists (ICIJ). 

Datashare allows investigative journalists to:
- access all their documents in one place locally on their computer while securing them from potential third-party interferences
- search pdfs, images, texts, spreadsheets, slides and any files, simultaneously
- automatically detect and filter by people, organizations and locations

## Translation of the interface

You're welcome to suggest translations on Datashare's Crowdin https://crwd.in/datashare. Please contact us if you would like to add a language.

## Installing and using

### Using with elasticsearch

You can download the script at datashare.icij.org.

To access web GUI, go in your documents folder and launch `path/to/datashare.sh` then connect datashare on http://localhost:8080

### Using only Named Entity Recognition

You can use the datashare docker container only for HTTP exposed name finding API.

Just run : 

    docker run -ti -p 8080:8080 -v /path/to/dist/:/home/datashare/dist icij/datashare:0.10 -m NER

A bit of explanation : 
- `-p 8080:8080` maps the 8080 to 8080, the you could access datashare at localhost:8080 (If you want to access it at localhost:8081, the change to `-p 8081:8080`)
- `-m NER` runs datashare without index at all on a stateless mode
- `-v /path/to/dist:/home/datashare/dist` maps the directory where the NLP models will be read (and downloaded if they don't exist)

Then query with curl the server with : 

    curl -i localhost:8080/api/ner/findNames/CORENLP --data-binary @path/to/a/file.txt

The last path part (CORENLP) is the framework. You can choose it among CORENLP, IXAPIPE, MITIE or OPENNLP.    

### **Extract Text from Files** 
  
*Implementations*
  
  - [TikaDocument](https://github.com/ICIJ/extract/blob/extractlib/extract-lib/src/main/java/org/icij/extract/document/TikaDocument.java) from ICIJ/extract 
  
    [Apache Tika](https://tika.apache.org/) v1.18 (Apache Licence v2.0)
  
    with [Tesseract](https://github.com/tesseract-ocr/tesseract/wiki/4.0-with-LSTM) v4.0 alpha 


*Support*

  [Tika File Formats](https://tika.apache.org/1.18/formats.html)

  
### **Extract Persons, Organizations or Locations from Text** 

Info: other languages than the ones listed below are not supported. We encourage you to reach out to the maintainers of the original NLP projects to support your preferred language.
   
*Implementations*
  
  - `org.icij.datashare.text.nlp.corenlp.CorenlpPipeline` 
  
    [Stanford CoreNLP](http://stanfordnlp.github.io/CoreNLP) v3.8.0, 
    (Conditional Random Fields), 
    *Composite GPL v3+* 

  - `org.icij.datashare.text.nlp.ixapipe.IxapipePipeline` 
  
    [Ixa Pipes Nerc](https://github.com/ixa-ehu/ixa-pipe-nerc) v1.6.1, 
    (Perceptron), 
    *Apache Licence v2.0*

  - `org.icij.datashare.text.nlp.mitie.MitiePipeline` 
  
    [MIT Information Extraction](https://github.com/mit-nlp/MITIE) v0.8, 
    (Structural Support Vector Machines), 
    *Boost Software License v1.0*

  - `org.icij.datashare.text.nlp.opennlp.OpennlpPipeline` 
  
    [Apache OpenNLP](https://opennlp.apache.org/) v1.6.0, 
    (Maximum Entropy), 
    *Apache Licence v2.0*

  
*Natural Language Processing Stages Support*

| `NlpStage`       |
|------------------|
| `TOKEN`          |
| `SENTENCE`       |
| `POS`            |
| `NER`            |

*Named Entity Recognition Language Support*

| *`NlpStage.NER`*           | `ENGLISH`  | `SPANISH`  | `GERMAN`  | `FRENCH`  | `CHINESE` |
|---------------------------:|:----------:|:----------:|:---------:|:---------:|:---------:|
| `NlpPipeline.Type.CORENLP` |     X      |      X     |      X    |  (w/ EN)  |     X     |
| `NlpPipeline.Type.OPENNLP` |     X      |      X     |      -    |     X     |     -     |
| `NlpPipeline.Type.IXAPIPE` |     X      |      X     |      X    |     -     |     -     |
| `NlpPipeline.Type.MITIE`   |     X      |      X     |      X    |     -     |     -     |

*Named Entity Categories Support*

| `NamedEntity.Category` |
|----------------------  |
| `ORGANIZATION`         |
| `PERSON`               |
| `LOCATION`             |

*Parts-of-Speech Language Support*

|  *`NlpStage.POS`*          | `ENGLISH`  | `SPANISH`  | `GERMAN`  | `FRENCH`  |
|---------------------------:|:----------:|:----------:|:---------:|:---------:|
| `NlpPipeline.Type.CORE`    |     X      |      X     |     X     |     X     |
| `NlpPipeline.Type.OPEN`    |     X      |      X     |     X     |     X     |
| `NlpPipeline.Type.IXA`     |     X      |      X     |     X     |     X     |
| `NlpPipeline.Type.MITIE`   |     -      |      -     |      -    |     -     |


### **Store and Search Documents and Named Entities**

 *Implementations*
  
 - `org.icij.datashare.text.indexing.elasticsearch.ElasticsearchIndexer`
 
   [Elasticsearch](https://www.elastic.co/products/elasticsearch) v7.9.1, *Apache Licence v2.0*



## Compilation / Build

Requires 
[JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html),
[Maven 3](http://maven.apache.org/download.cgi) and a running [PostgreSQL](https://www.postgresql.org/) database (hostname `postgres`) 
with two databases `datashare` and `test` with write access for user `test` / password `test`. 
```shell
docker run --name postgres -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -d postgres
```
You'll need also a running
elasticsearch instance with `elasticsearch` as hostname ;
```shell
docker network create datashare
docker run --name elasticsearch --net datashare -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms1g -Xmx1g" docker.elastic.co/elasticsearch/elasticsearch:7.17.8
docker run --name kibana --net datashare -p 127.0.0.1:5601:5601 -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" docker.elastic.co/kibana/kibana:7.17.8
```
and a redis server named `redis` as well.
```shell
docker run --name redis -d redis:7-alpine
```

```
mvn validate
mvn -pl commons-test -am install
mvn -pl datashare-db liquibase:update
mvn test
```

## Keeping the development environment up to date

It is important to keep `datashare` and `datashare-client` up to date by pulling from each repository's master branch. 

To ensure that updates are registered, `make clean dist` must be run locally from each repository. 

If dependencies have been updated on `datashare-client`, run `yarn` **before** `make clean dist`.

If the database models have changed within `datashare`, run the following commands **before** `make clean dist`:

```
sh datashare-db/scr/reset_datashare_db.sh
mvn -pl commons-test -am install
mvn -pl datashare-db liquibase:update
mvn test
```

## License

Datashare is released under the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html)


## Bug report, comment or (pull) request

We welcome feedback as well as contributions!

For any bug, question, comment or (pull) request, 

please contact us at datashare@icij.org
 
 
