module.exports = {
  getCSSValues: (input) => {
    const line = parseInt(input.lineHeight, 10);
    const margin = [0, 0, 0];
    const padding = [0, 0, 0];
    const { offset } = input;

    if (line === 16) {
      margin[2] = `${-offset}px`;
      padding[0] = `${offset}px`;
    } else if (offset > 16) {
      margin[2] = `${-offset + 16}px`;
      padding[0] = `${offset - 16}px`;
    } else {
      margin.splice(1);
      padding[2] = `${line - offset}px`;
    }

    // NOT FINISHED YET


    return {
      padding: padding.join(' '),
      margin: margin.join(' '),
    };
  },
};
