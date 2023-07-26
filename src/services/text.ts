// Copied from https://github.com/geongeorge/Canvas-Txt/tree/44351f0bc2f06e630b6f40bd345f2e0843aa237a

interface JustifyLineProps {
  ctx: CanvasRenderingContext2D;
  line: string;
  spaceWidth: number;
  spaceChar: string;
  width: number;
}

function justifyLine({ ctx, line, spaceWidth, spaceChar, width }: JustifyLineProps) {
  const text = line.trim();
  const words = text.split(/\s+/);
  const noOfWords = words.length - 1;

  if (noOfWords === 0) return text;

  // Width without spaces
  const lineWidth = ctx.measureText(words.join("")).width;

  const noOfSpacesToInsert = (width - lineWidth) / spaceWidth;
  const spacesPerWord = Math.floor(noOfSpacesToInsert / noOfWords);

  if (noOfSpacesToInsert < 1) return text;

  const spaces = spaceChar.repeat(spacesPerWord);

  const justifiedText = words.join(spaces);

  return justifiedText;
}

const SPACE = "\u{200a}";

interface SplitTextProps {
  ctx: CanvasRenderingContext2D;
  text: string;
  justify: boolean;
  width: number;
}

function splitText({ ctx, text, justify, width }: SplitTextProps): string[] {
  const textMap = new Map<string, number>();

  const measureText = (text: string): number => {
    let width = textMap.get(text);
    if (width !== undefined) {
      return width;
    }

    width = ctx.measureText(text).width;
    textMap.set(text, width);
    return width;
  };

  let textArray: string[] = [];
  let initialTextArray = text.split("\n");

  const spaceWidth = justify ? measureText(SPACE) : 0;

  let index = 0;
  let averageSplitPoint = 0;
  for (const singleLine of initialTextArray) {
    let textWidth = measureText(singleLine);
    const singleLineLength = singleLine.length;

    if (textWidth <= width) {
      textArray.push(singleLine);
      continue;
    }

    let tempLine = singleLine;

    let splitPoint;
    let splitPointWidth;
    let textToPrint = "";

    while (textWidth > width) {
      index++;
      splitPoint = averageSplitPoint;
      splitPointWidth = splitPoint === 0 ? 0 : measureText(singleLine.substring(0, splitPoint));

      // if (splitPointWidth === width) Nailed
      if (splitPointWidth < width) {
        while (splitPointWidth < width && splitPoint < singleLineLength) {
          splitPoint++;
          splitPointWidth = measureText(tempLine.substring(0, splitPoint));
          if (splitPoint === singleLineLength) break;
        }
      } else if (splitPointWidth > width) {
        while (splitPointWidth > width) {
          splitPoint = Math.max(1, splitPoint - 1);
          splitPointWidth = measureText(tempLine.substring(0, splitPoint));
          if (splitPoint === 0 || splitPoint === 1) break;
        }
      }

      averageSplitPoint = Math.round(averageSplitPoint + (splitPoint - averageSplitPoint) / index);

      // Remove last character that was out of the box
      splitPoint--;

      // Ensures a new line only happens at a space, and not amidst a word
      if (splitPoint > 0) {
        let tempSplitPoint = splitPoint;
        if (tempLine.substring(tempSplitPoint, tempSplitPoint + 1) != " ") {
          while (tempLine.substring(tempSplitPoint, tempSplitPoint + 1) != " " && tempSplitPoint >= 0) {
            tempSplitPoint--;
          }
          if (tempSplitPoint > 0) {
            splitPoint = tempSplitPoint;
          }
        }
      }

      if (splitPoint === 0) {
        splitPoint = 1;
      }

      // Finally sets text to print
      textToPrint = tempLine.substring(0, splitPoint);

      textToPrint = justify
        ? justifyLine({
            ctx,
            line: textToPrint,
            spaceWidth,
            spaceChar: SPACE,
            width,
          })
        : textToPrint;
      textArray.push(textToPrint);
      tempLine = tempLine.substring(splitPoint);
      textWidth = measureText(tempLine);
    }

    if (textWidth > 0) {
      textToPrint = justify
        ? justifyLine({
            ctx,
            line: tempLine,
            spaceWidth,
            spaceChar: SPACE,
            width,
          })
        : tempLine;

      textArray.push(textToPrint);
    }
  }
  return textArray;
}

interface TextHeightProps {
  ctx: CanvasRenderingContext2D;
  text: string;
  style: string;
}

function getTextHeight({ ctx, text, style }: TextHeightProps) {
  const previousTextBaseline = ctx.textBaseline;
  const previousFont = ctx.font;

  ctx.textBaseline = "bottom";
  ctx.font = style;
  const { actualBoundingBoxAscent: height } = ctx.measureText(text);

  // Reset baseline
  ctx.textBaseline = previousTextBaseline;
  ctx.font = previousFont;

  return height;
}

export type Align = "left" | "center" | "right";
export type VAlign = "top" | "middle" | "bottom";

export interface CanvasTextConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  debug?: boolean;
  align?: Align;
  vAlign?: VAlign;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  fontVariant?: string;
  font?: string;
  lineHeight?: number;
  justify?: boolean;
}

const defaultConfig = {
  debug: false,
  align: "center",
  vAlign: "middle",
  fontSize: 14,
  fontWeight: "",
  fontStyle: "",
  fontVariant: "",
  font: "Arial",
  // @ts-ignore
  lineHeight: null,
  justify: false,
};

function drawText(ctx: CanvasRenderingContext2D, myText: string, inputConfig: CanvasTextConfig) {
  const { width, height, x, y } = inputConfig;
  const config = { ...defaultConfig, ...inputConfig };

  if (width <= 0 || height <= 0 || config.fontSize <= 0) {
    //width or height or font size cannot be 0
    return { height: 0 };
  }

  // End points
  const xEnd = x + width;
  const yEnd = y + height;

  const { fontStyle, fontVariant, fontWeight, fontSize, font } = config;
  const style = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${font}`;
  ctx.font = style;

  let txtY = y + height / 2 + config.fontSize / 2;

  let textAnchor: number;

  if (config.align === "right") {
    textAnchor = xEnd;
    ctx.textAlign = "right";
  } else if (config.align === "left") {
    textAnchor = x;
    ctx.textAlign = "left";
  } else {
    textAnchor = x + width / 2;
    ctx.textAlign = "center";
  }

  const textArray = splitText({
    ctx,
    text: myText,
    justify: config.justify,
    width,
  });

  const charHeight = config.lineHeight ? config.lineHeight : getTextHeight({ ctx, text: "M", style });
  const vHeight = charHeight * (textArray.length - 1);
  const negOffset = vHeight / 2;

  let debugY = y;
  // Vertical Align
  if (config.vAlign === "top") {
    ctx.textBaseline = "top";
    txtY = y;
  } else if (config.vAlign === "bottom") {
    ctx.textBaseline = "bottom";
    txtY = yEnd - vHeight;
    debugY = yEnd;
  } else {
    //defaults to center
    ctx.textBaseline = "bottom";
    debugY = y + height / 2;
    txtY -= negOffset;
  }
  //print all lines of text
  textArray.forEach((txtline) => {
    // txtline = txtline.trim();
    ctx.fillText(txtline, textAnchor, txtY);
    txtY += charHeight;
  });

  if (config.debug) {
    // Text box
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#0C8CE9";
    ctx.strokeRect(x, y, width, height);

    ctx.lineWidth = 1;
    // Horizontal Center
    ctx.strokeStyle = "#0C8CE9";
    ctx.beginPath();
    ctx.moveTo(textAnchor, y);
    ctx.lineTo(textAnchor, yEnd);
    ctx.stroke();
    // Vertical Center
    ctx.strokeStyle = "#0C8CE9";
    ctx.beginPath();
    ctx.moveTo(x, debugY);
    ctx.lineTo(xEnd, debugY);
    ctx.stroke();
  }

  const TEXT_HEIGHT = vHeight + charHeight;

  return { height: TEXT_HEIGHT };
}

export { drawText, splitText, getTextHeight };
