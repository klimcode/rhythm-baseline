module.exports = {
  getCSSValues: (data) => {
    const line = parseInt(data.lineHeight, 10);
    const margin = [0, 0, 0];
    const padding = [0, 0, 0];
    const { offset, gap } = data;
    const gapSize = ((gap > 0) && gap * line) || 0;

    // rules without a top gap
    if (!gap)
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
    else // Rules with a top gap made with a Padding
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
    }



    return Object.assign(data, {
      padding: padding.join(' '),
      margin: margin.join(' '),
    });
  },

  getCSSCode: data => (
    `%baseline_${data.family}_${data.fontSize}_${data.lineHeight} {\n` +
    `  margin: ${data.margin};\n` +
    `  padding: ${data.padding};\n` +
    `  font-size: ${data.fontSize};\n` +
    `  line-height: ${data.lineHeight};\n` +
    '}\n'
  ),
};
