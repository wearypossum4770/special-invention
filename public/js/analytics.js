// https://github.com/akamai/boomerang/tree/master
const getDocumentSize = ({
  scrollWidth,
  offsetWidth,
  clientWidth,
  scrollHeight,
  offsetHeight,
  clientHeight,
}) => ({
  document_height: Math.max.apply(this, [
    document.body.scrollHeight,
    scrollHeight,
    document.body.offsetHeight,
    offsetHeight,
    document.body.clientHeight,
    clientHeight,
  ]),
  document_width: Math.max.apply(this, [
    doument.body.scrollWidth,
    scrollWidth,
    doument.body.offsetWidth,
    offsetWidth,
    doument.body.clientWidth,
    clientWidth,
  ]),
});
const getViewport = () => ({
  viewport_height: window.innerHeight,
  viewport_width: window.innerWidth,
});

const getForm = () => document.querySelectorAll("[data-analytic-name]");

const extractClassList = ({ classList }) => ({
  classList: Array.from(classList),
});
const handleClick = ({
  x,
  y,
  timeStamp,
  detail,
  type,
  _vts,
  _reactName,
  target,
}) => {
  const {
    __vueParentComponent,
    __vnode,
    scrollHeight,
    offsetHeight,
    clientHeight,
    scrollWidth,
    offsetWidth,
    clientWidth,
    classList,
    nodeName,
    id,
  } = target;
  return {
    ...getViewport(),
    ...getDocumentSize({
      scrollHeight,
      offsetHeight,
      clientHeight,
      scrollWidth,
      offsetWidth,
      clientWidth,
    }),
    vue_framework: !!__vueParentComponent || !!__vnode,
    react_framework: !!_reactName,
    event_time: _vts ?? Date.now(),
    event_type: 1,
    detail,
    event_action: type.toUpperCase(),
    class_list: extractClassList({ classList }),
    elemnent_type: nodeName,
    id,
    x,
    y,
    waterfall: timeStamp,
  };
};
