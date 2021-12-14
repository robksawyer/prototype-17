/**
 * Ascii Morph
 * @author: Tim Holman (http://tholman.com)
 */
'use strict';

export const AsciiMorph = ({
  element,
  canvasSize: canvasDimensions,
  renderedData = [],
  framesToAnimate = [],
  myTimeout,
}) => {
  /**
   * Utils
   */
  const extend = (target, source) => {
    for (var key in source) {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }
    return target;
  };

  const repeat = (pattern, count) => {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
      if (count & 1) result += pattern;
      (count >>= 1), (pattern += pattern);
    }
    return result + pattern;
  };

  const replaceAt = (string, index, character) => {
    return (
      string.substr(0, index) +
      character +
      string.substr(index + character.length)
    );
  };

  /**
   * AsciiMorph
   */

  const squareOutData = data => {
    var i;
    var renderDimensions = {
      x: 0,
      y: data.length,
    };

    // Calculate centering numbers
    for (i = 0; i < data.length; i++) {
      if (data[i].length > renderDimensions.x) {
        renderDimensions.x = data[i].length;
      }
    }

    // Pad out right side of data to square it out
    for (i = 0; i < data.length; i++) {
      if (data[i].length < renderDimensions.x) {
        data[i] = data[i] + repeat(' ', renderDimensions.x - data[i].length);
      }
    }

    var paddings = {
      x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
      y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2),
    };

    // Left Padding
    for (var i = 0; i < data.length; i++) {
      data[i] = repeat(' ', paddings.x) + data[i] + repeat(' ', paddings.x);
    }

    // Pad out the rest of everything
    for (var i = 0; i < canvasDimensions.y; i++) {
      if (i < paddings.y) {
        data.unshift(repeat(' ', canvasDimensions.x));
      } else if (i > paddings.y + renderDimensions.y) {
        data.push(repeat(' ', canvasDimensions.x));
      }
    }

    return data;
  };

  // Crushes the frame data by 1 unit.
  const getMorphedFrame = data => {
    var firstInLine,
      lastInLine = null;
    var found = false;
    for (var i = 0; i < data.length; i++) {
      var line = data[i];
      firstInLine = line.search(/\S/);
      if (firstInLine === -1) {
        firstInLine = null;
      }

      for (var j = 0; j < line.length; j++) {
        if (line[j] != ' ') {
          lastInLine = j;
        }
      }

      if (firstInLine !== null && lastInLine !== null) {
        data = crushLine(data, i, firstInLine, lastInLine);
        found = true;
      }

      (firstInLine = null), (lastInLine = null);
    }

    if (found) {
      return data;
    } else {
      return false;
    }
  };

  /**
   * crushLine
   * @param {*} data
   * @param {*} line
   * @param {*} start
   * @param {*} end
   * @returns
   */
  const crushLine = (data, line, start, end) => {
    var centers = {
      x: Math.floor(canvasDimensions.x / 2),
      y: Math.floor(canvasDimensions.y / 2),
    };

    var crushDirection = 1;
    if (line > centers.y) {
      crushDirection = -1;
    }

    var charA = data[line][start];
    var charB = data[line][end];

    data[line] = replaceAt(data[line], start, ' ');
    data[line] = replaceAt(data[line], end, ' ');

    if (!(end - 1 == start + 1) && !(start === end) && !(start + 1 === end)) {
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        start + 1,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1),
      );
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        end - 1,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1),
      );
    } else if (
      (start === end || start + 1 === end) &&
      line + 1 !== centers.y &&
      line - 1 !== centers.y &&
      line !== centers.y
    ) {
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        start,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1),
      );
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        end,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1),
      );
    }

    return data;
  };

  /**
   * renderSquareData
   * @param {*} data
   */
  const renderSquareData = (el, data) => {
    el.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      el.innerHTML = el.innerHTML + data[i] + '\n';
    }

    renderedData = data;
  };

  /**
   * render
   * @param {*} data
   */
  const render = (el, data) => {
    var ourData = squareOutData(data.slice());
    renderSquareData(el, ourData);
  };

  /**
   * Morph between whatever is current, to the new frame
   * @param {*} data
   */
  const morph = (el, data) => {
    clearTimeout(myTimeout);
    var frameData = prepareFrames(data.slice());
    animateFrames(el, frameData);
  };

  /**
   * prepareFrames
   * @param {*} data
   * @returns
   */
  const prepareFrames = data => {
    var deconstructionFrames = [];
    var constructionFrames = [];

    var clonedData = renderedData;

    // If its taking more than 100 frames, its probably somehow broken
    // Get the deconscrution frames
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(clonedData);
      if (newData === false) {
        break;
      }
      deconstructionFrames.push(newData.slice(0));
      clonedData = newData;
    }

    // Get the constuction frames for the new data
    var squareData = squareOutData(data);
    constructionFrames.unshift(squareData.slice(0));
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(squareData);
      if (newData === false) {
        break;
      }
      constructionFrames.unshift(newData.slice(0));
      squareData = newData;
    }

    return deconstructionFrames.concat(constructionFrames);
  };

  const animateFrames = (element, frameData) => {
    framesToAnimate = frameData;
    animateFrame(element);
  };

  const animateFrame = element => {
    myTimeout = setTimeout(() => {
      renderSquareData(element, framesToAnimate[0]);
      framesToAnimate.shift();
      if (framesToAnimate.length > 0) {
        animateFrame();
      }
    }, 20);

    // framesToAnimate
  };

  if (!element || !canvasDimensions) {
    console.log('sorry, I need an element and a canvas size');
    return null;
  }

  return {
    render,
    morph,
  };
};
