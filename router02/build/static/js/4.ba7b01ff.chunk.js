(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[4],{47:function(e,t,o){e.exports={card:"Card_card__13kTz"}},48:function(e,t,o){e.exports={form:"QuoteForm_form__2XPCZ",loading:"QuoteForm_loading__23dvF",control:"QuoteForm_control__22w5G",actions:"QuoteForm_actions__3ojAi"}},56:function(e,t,o){"use strict";o.r(t);var c=o(1),n=o(2),r=o(21),s=o(47),a=o.n(s),l=o(0),i=function(e){return Object(l.jsx)("div",{className:a.a.card,children:e.children})},u=o(14),d=o(48),j=o.n(d),b=function(e){var t=Object(c.useState)(!1),o=Object(r.a)(t,2),s=o[0],a=o[1],d=Object(c.useRef)(),b=Object(c.useRef)();return Object(l.jsxs)(c.Fragment,{children:[Object(l.jsx)(n.a,{when:s,message:function(e){return"Are you really want to leave the page? All your entered data will be lost!"}}),Object(l.jsx)(i,{children:Object(l.jsxs)("form",{onFocus:function(){console.log("Form has Focused!"),a(!0),console.log(s)},className:j.a.form,onSubmit:function(t){t.preventDefault(),console.log(s);var o=d.current.value,c=b.current.value;e.onAddQuote({author:o,text:c})},children:[e.isLoading&&Object(l.jsx)("div",{className:j.a.loading,children:Object(l.jsx)(u.a,{})}),Object(l.jsxs)("div",{className:j.a.control,children:[Object(l.jsx)("label",{htmlFor:"author",children:"Author"}),Object(l.jsx)("input",{type:"text",id:"author",ref:d})]}),Object(l.jsxs)("div",{className:j.a.control,children:[Object(l.jsx)("label",{htmlFor:"text",children:"Text"}),Object(l.jsx)("textarea",{id:"text",rows:"5",ref:b})]}),Object(l.jsx)("div",{className:j.a.actions,children:Object(l.jsx)("button",{onClick:function(){console.log("finishEnteringHandler triggered"),a(!1),console.log(s)},className:"btn",children:"Add Quote"})})]})})]})},h=o(19),f=o(20);t.default=function(){var e=Object(h.a)(f.b),t=e.sendRequest,o=e.status,r=Object(n.h)();Object(c.useEffect)((function(){"completed"===o&&r.push("/quotes")}),[o,r]);return Object(l.jsx)(b,{isLoading:"pending"===o,onAddQuote:function(e){t(e)}})}}}]);
//# sourceMappingURL=4.ba7b01ff.chunk.js.map