// eslint-env browser

// refactored code of https://github.com/georgecrawford/font-baseline
function getFontMetrics(cont) { // eslint-disable-line no-unused-vars
  const container = cont || document.body;
  const div = document.createElement('div');
  const style = document.createElement('style');
  const strut = document.createElement('span');


  // Webkit hack: http://davidwalsh.name/add-rules-stylesheets
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);
  style.sheet.insertRule('.font-baseline{visibility:hidden;height:100px;}', 0);
  style.sheet.insertRule('.font-baseline span:after{content:\'\';height:100%;display:inline-block;}', 1);

  // Thanks to Alan Stearns for the hack!
  // http://blogs.adobe.com/webplatform/2014/08/13/one-weird-trick-to-baseline-align-text/
  strut.textContent = 'T';
  div.appendChild(strut);
  div.classList.add('font-baseline');
  container.appendChild(div);

  const computedStyle = window.getComputedStyle(strut);
  const fontSize = parseInt(computedStyle.fontSize, 10);
  const computedLineHeight = parseInt(computedStyle.lineHeight, 10);

  strut.style.lineHeight = 0;
  const strutHeight = strut.offsetHeight;
  const baselineHeight = (strut.offsetTop + strutHeight) - div.offsetHeight - div.offsetTop;
  const lineHeight = computedLineHeight || strutHeight;


  // Clearing
  setTimeout(() => {
    div.parentNode.removeChild(div);
    style.parentNode.removeChild(style);
  }, 10);

  return {
    fontFamily: computedStyle.fontFamily,
    baseline:   baselineHeight,
    content:    strutHeight,
    font:       fontSize,
    line:       lineHeight,
    multiplier: fontSize / strutHeight,
    offset:     Math.floor(((lineHeight - strutHeight) / 2) + baselineHeight),
    leading:    lineHeight - strutHeight,
  };
}
