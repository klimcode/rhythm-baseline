module.exports = {
  getCSSValues: (data, gap) => {
    const line = parseInt(data.lineHeight, 10);
    const margin = [0, 0, 0];
    const padding = [0, 0, 0];
    const { offset } = data;
    const gapSize = ((gap > 0) && gap * line) || 0;

    // rules without a top gap
    if (!gap) {
      if (line === 16) {
        margin[2] = `${-offset}px`;
        padding[0] = `${offset}px`;
      } else if (offset > 16) {
        margin[2] = `${16 - offset}px`;
        padding[0] = `${offset - 16}px`;
      } else {
        margin[0] = `${offset - 16}px`;
        padding[2] = `${16 - offset}px`;
      }
    // Rules with a top gap made with a Padding
    } else if (line === 16) {
      margin[2] = `${-offset}px`;
      padding[0] = `${offset + gapSize}px`;
    } else if (offset > 16) {
      margin[2] = `${16 - offset}px`;
      padding[0] = `${gapSize + (offset - 16)}px`;
    } else {
      margin.splice(1);
      padding[0] = `${gapSize - (16 - offset)}px`;
      padding[2] = `${16 - offset}px`;
    }


    return Object.assign(data, {
      padding: padding.join(' '),
      margin: margin.join(' '),
    });
  },

  getCSSCode: (data, gap) => {
    const gapMarker = gap ? '_gap' : '';
    return (
      `%baseline_${data.family}_${data.fontSize}_${data.lineHeight}${gapMarker} {\n` +
      `  margin: ${data.margin};\n` +
      `  padding: ${data.padding};\n` +
      `  font-size: ${data.fontSize};\n` +
      `  line-height: ${data.lineHeight};\n` +
      '}\n'
    )
  },
};
