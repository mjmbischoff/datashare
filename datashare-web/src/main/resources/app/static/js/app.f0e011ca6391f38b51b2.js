webpackJsonp([0],{"2pJe":function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n.fragments[data-v-1d54fe2e], .named-entities[data-v-1d54fe2e], .aggregation[data-v-1d54fe2e] {\n  color: #7f7f7f;\n  margin-left: 1em;\n}\n.fragment[data-v-1d54fe2e], .named-entity[data-v-1d54fe2e] {\n  margin-left: 5px;\n}\n","",{version:3,sources:["/home/dev/src/datashare-client/src/components/src/components/SearchResults.vue"],names:[],mappings:";AAgCA;EACA,eAAA;EACA,iBAAA;CACA;AACA;EACA,iBAAA;CACA",file:"SearchResults.vue",sourcesContent:['<template>\n  <div class="search-results list">\n    <div v-if="\'\'.localeCompare(query) !== 0">\n      <h3>{{$t(\'search.results.results\', {total: results.total, query})}}</h3>\n      <div class="item" v-for="item in results.hits" :key="item._id">\n        document : {{item._source.path}}\n        <div class="named-entities">\n          {{$t(\'search.results.entities\')}}: <b>{{ item.inner_hits.NamedEntity.hits.total }}</b>\n          <span class="named-entity" v-for="ne in item.inner_hits.NamedEntity.hits.hits" :key="ne._id">{{ne._source.mention}} ({{ne._source.category}}/{{ne._source.extractor}}/{{ne._source.offset}})</span>\n        </div>\n        <div class="fragments">\n          {{$t(\'search.results.match\')}}:\n          <span class="fragment" v-for="fragment in item.highlight.content" v-html="fragment" :key="fragment"></span>\n        </div>\n      </div>\n    </div>\n    <div v-else>\n      <div class="item" v-for="item in results.mentions.buckets" :key="item.key">\n        <a href="#" @click="$emit(\'update:query\', item.key)">{{item.key}}</a><span class="aggregation">{{item.doc_count}} occurences, {{item.docs.value}} documents</span>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \'search-results\',\n  props: [\'results\', \'query\']\n}\n<\/script>\n\n<style scoped>\n  .fragments, .named-entities, .aggregation {\n    color: #7f7f7f;\n    margin-left: 1em;\n  }\n  .fragment, .named-entity {\n    margin-left: 5px;\n  }\n</style>\n'],sourceRoot:""}])},"6H7H":function(e,n,t){var s=t("Bbpv");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t("rjj0")("63ef8628",s,!1,{})},Bbpv:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"App.vue",sourceRoot:""}])},GHGh:function(e,n,t){var s=t("z/+d");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t("rjj0")("08bac906",s,!1,{})},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t("7+uW"),a=t("TXmL"),r=function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)};r._withStripped=!0;var i={render:r,staticRenderFns:[]},c=i;var o=!1;var l=t("VU/8")({name:"App"},c,!1,function(e){o||t("GHGh")},null,null);l.options.__file="src/App.vue";var u=l.exports,h=t("/ocq"),d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"language-chooser"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.language,expression:"language"}],on:{change:[function(n){var t=Array.prototype.filter.call(n.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.language=n.target.multiple?t:t[0]},e.onChange]}},[t("option",{attrs:{selected:"",value:"en"}},[e._v("English")]),e._v(" "),t("option",{attrs:{value:"fr"}},[e._v("French")])])])};d._withStripped=!0;var p={render:d,staticRenderFns:[]},m=p;var f=t("VU/8")({name:"language-chooser",data:function(){return{language:"en"}},methods:{onChange:function(e){this.$root.$i18n.locale=e.target.value}}},m,!1,null,null,null);f.options.__file="src/components/LanguageChooser.vue";var v=f.exports,g=t("Ci8L"),y=t.n(g),_=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"search-results list"},[0!=="".localeCompare(e.query)?t("div",[t("h3",[e._v(e._s(e.$t("search.results.results",{total:e.results.total,query:e.query})))]),e._v(" "),e._l(e.results.hits,function(n){return t("div",{key:n._id,staticClass:"item"},[e._v("\n      document : "+e._s(n._source.path)+"\n      "),t("div",{staticClass:"named-entities"},[e._v("\n        "+e._s(e.$t("search.results.entities"))+": "),t("b",[e._v(e._s(n.inner_hits.NamedEntity.hits.total))]),e._v(" "),e._l(n.inner_hits.NamedEntity.hits.hits,function(n){return t("span",{key:n._id,staticClass:"named-entity"},[e._v(e._s(n._source.mention)+" ("+e._s(n._source.category)+"/"+e._s(n._source.extractor)+"/"+e._s(n._source.offset)+")")])})],2),e._v(" "),t("div",{staticClass:"fragments"},[e._v("\n        "+e._s(e.$t("search.results.match"))+":\n        "),e._l(n.highlight.content,function(n){return t("span",{key:n,staticClass:"fragment",domProps:{innerHTML:e._s(n)}})})],2)])})],2):t("div",e._l(e.results.mentions.buckets,function(n){return t("div",{key:n.key,staticClass:"item"},[t("a",{attrs:{href:"#"},on:{click:function(t){e.$emit("update:query",n.key)}}},[e._v(e._s(n.key))]),t("span",{staticClass:"aggregation"},[e._v(e._s(n.doc_count)+" occurences, "+e._s(n.docs.value)+" documents")])])}))])};_._withStripped=!0;var b={render:_,staticRenderFns:[]},A=b;var C=!1;var Q=t("VU/8")({name:"search-results",props:["results","query"]},A,!1,function(e){C||t("oATY")},"data-v-1d54fe2e",null);Q.options.__file="src/components/SearchResults.vue";var k=Q.exports,x=new y.a.Client({host:"elasticsearch:9200",log:"trace"}),R={components:{SearchResults:k},name:"search",data:function(){return{searchQuery:"",lastQuery:"",searchResults:[]}},created:function(){this.aggregate()},methods:{search:function(){if(0==="".localeCompare(this.searchQuery))this.lastQuery="",this.aggregate();else{var e=this;x.search({index:"datashare-local",type:"doc",size:200,body:{query:{bool:{should:[{has_child:{type:"NamedEntity",query:{match:{mention:e.searchQuery}},inner_hits:{size:10}}},{match:{content:e.searchQuery}}]}},highlight:{fields:{content:{fragment_size:150,number_of_fragments:10,pre_tags:["<b>"],post_tags:["</b>"]}}}}}).then(function(n){e.searchResults=n.hits},function(e){console.trace(e.message)}),e.lastQuery=e.searchQuery,this.searchQuery=""}},aggregate:function(){var e=this;x.search({index:"datashare-local",type:"doc",size:0,body:{query:{constant_score:{filter:{term:{type:"NamedEntity"}}}},aggs:{mentions:{terms:{field:"mention_norm",size:30},aggs:{docs:{cardinality:{field:"join"}}}}}}}).then(function(n){e.searchResults=n.aggregations},function(e){console.trace(e.message)})}},watch:{lastQuery:function(e,n){""===n&&""!==e&&(this.searchQuery=e,this.search())}}},S=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"search"},[t("div",{staticClass:"search-bar"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],attrs:{type:"search",placeholder:e.$t("search.placeholder"),name:"search",size:"32 "},domProps:{value:e.searchQuery},on:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;e.search(n)},input:function(n){n.target.composing||(e.searchQuery=n.target.value)}}}),e._v(" "),t("button",{on:{click:e.search}},[e._v(e._s(e.$t("search.buttonlabel")))])]),e._v(" "),t("search-results",{attrs:{results:e.searchResults,query:e.lastQuery},on:{"update:query":function(n){e.lastQuery=n}}})],1)};S._withStripped=!0;var q={render:S,staticRenderFns:[]},w=q;var $=!1;var E=t("VU/8")(R,w,!1,function(e){$||t("i+tC")},"data-v-7cb41050",null);E.options.__file="src/components/Search.vue";var z={components:{Search:E.exports,LanguageChooser:v},name:"App"},N=function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"app"},[n("language-chooser"),this._v(" "),n("search")],1)};N._withStripped=!0;var j={render:N,staticRenderFns:[]},F=j;var H=!1;var T=t("VU/8")(z,F,!1,function(e){H||t("6H7H")},null,null);T.options.__file="src/components/App.vue";var V=T.exports;s.a.use(h.a);var L=new h.a({routes:[{path:"/",name:"App",component:V}]}),U=t("S8TV"),B=t.n(U);s.a.use(a.a),s.a.config.productionTip=!1;var G=new a.a({locale:"en",fallbackLocale:"en",messages:B.a});new s.a({i18n:G,el:"#app",router:L,components:{App:u},template:"<App/>"})},S8TV:function(e,n){e.exports={en:{search:{placeholder:"Search in documents...",buttonlabel:"Search",results:{match:"match in doc",entities:"nb entities",results:'%{total} document(s) found for "%{query}"'}}},fr:{search:{placeholder:"Rechercher dans les documents...",buttonlabel:"Rechercher",results:{match:"dans le doc",entities:"nb entités",results:'%{total} document(s) trouvé(s) pour "%{query}"'}}}}},"i+tC":function(e,n,t){var s=t("yboS");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t("rjj0")("4c5030d4",s,!1,{})},oATY:function(e,n,t){var s=t("2pJe");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t("rjj0")("ef2efbf0",s,!1,{})},yboS:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n.search-bar[data-v-7cb41050] {\n  padding: 3em;\n}\n","",{version:3,sources:["/home/dev/src/datashare-client/src/components/src/components/Search.vue"],names:[],mappings:";AAWA;EACA,aAAA;CACA",file:"Search.vue",sourcesContent:["<template>\n  <div class=\"search\">\n    <div class=\"search-bar\">\n      <input v-model=\"searchQuery\" v-on:keyup.enter=\"search\" type=\"search\" :placeholder=\"$t('search.placeholder')\" name=\"search\" size=\"32 \">\n      <button v-on:click=\"search\">{{ $t('search.buttonlabel') }}</button>\n    </div>\n    <search-results v-bind:results=\"searchResults\" :query.sync=\"lastQuery\"/>\n  </div>\n</template>\n\n<style scoped>\n  .search-bar {\n    padding: 3em;\n  }\n</style>\n\n<script>\nimport es from 'elasticsearch-browser'\nimport SearchResults from './SearchResults'\n\nvar esClient = new es.Client({\n  host: 'elasticsearch:9200',\n  log: 'trace'\n})\n\nexport default {\n  components: {SearchResults},\n  name: 'search',\n  data () {\n    return {searchQuery: '', lastQuery: '', searchResults: []}\n  },\n  created: function () {\n    this.aggregate()\n  },\n  methods: {\n    search () {\n      if (''.localeCompare(this.searchQuery) === 0) {\n        this.lastQuery = ''\n        this.aggregate()\n      } else {\n        const that = this\n        esClient.search({\n          index: 'datashare-local',\n          type: 'doc',\n          size: 200,\n          body: {\n            query: {\n              bool: {\n                should: [\n                  {\n                    has_child: {\n                      type: 'NamedEntity',\n                      query: {\n                        match: {\n                          mention: that.searchQuery\n                        }\n                      },\n                      inner_hits: {\n                        size: 10\n                      }\n                    }\n                  },\n                  {\n                    match: {content: that.searchQuery}\n                  }\n                ]\n              }\n            },\n            highlight: {\n              fields: {\n                content: {\n                  fragment_size: 150,\n                  number_of_fragments: 10,\n                  pre_tags: ['<b>'],\n                  post_tags: ['</b>']\n                }\n              }\n            }\n          }\n        }).then(function (resp) {\n          that.searchResults = resp.hits\n        }, function (err) {\n          console.trace(err.message)\n        })\n        that.lastQuery = that.searchQuery\n        this.searchQuery = ''\n      }\n    },\n    aggregate: function () {\n      const that = this\n      esClient.search({\n        index: 'datashare-local',\n        type: 'doc',\n        size: 0,\n        body: {\n          query: {\n            constant_score: {filter: {term: {type: 'NamedEntity'}}}\n          },\n          aggs: {\n            mentions: {\n              terms: {field: 'mention_norm', size: 30},\n              aggs: {\n                docs: {\n                  cardinality: {\n                    field: 'join'\n                  }\n                }\n              }\n            }\n          }\n        }\n      }).then(function (resp) {\n        that.searchResults = resp.aggregations\n      }, function (err) {\n        console.trace(err.message)\n      })\n    }\n  },\n  watch: {\n    lastQuery (newQuery, oldQuery) {\n      if (oldQuery === '' && newQuery !== '') {\n        this.searchQuery = newQuery\n        this.search()\n      }\n    }\n  }\n}\n<\/script>\n"],sourceRoot:""}])},"z/+d":function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"App.vue",sourceRoot:""}])}},["NHnr"]);
//# sourceMappingURL=app.f0e011ca6391f38b51b2.js.map