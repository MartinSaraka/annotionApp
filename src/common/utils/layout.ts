import { GRID_LAYOUT_DEFAULT_OPTIONS } from '@common/constants/layout'

const MARGINS = GRID_LAYOUT_DEFAULT_OPTIONS?.margin || [12, 12]
const COL_WIDTH = GRID_LAYOUT_DEFAULT_OPTIONS?.rowHeight || 48

/**
 * Calculate the number of columns that fit in a given width
 * @description Equation for (x = number of columns):
 * - WIDTH = x * COL_WIDTH + (COL_WIDTH + 1) * MARGIN
 * - 0 = x * COL_WIDTH + (x + 1) * MARGIN - WIDTH
 * - 0 = COL_WIDTHx + MARGINx + MARGIN - WIDTH
 * - COL_WIDTHx + MARGINx = WIDTH - MARGIN
 * - x(COL_WIDTH + MARGIN) = WIDTH - MARGIN
 * - x = (WIDTH - MARGIN) / (COL_WIDTH + MARGIN)
 */
export const getFixedWidthColsCount = (
  initialWidth?: number,
  fallbackWidth = 1212
) => {
  const width = initialWidth || fallbackWidth
  const margin = MARGINS[0] as number

  return Math.floor((width - margin) / (COL_WIDTH + margin))
}

/**
 * Calculate the gap between cells in a given width for specified number of columns
 * @description Equation for (x = gap between cells):
 * - REAL_WIDTH = NUMBER_OF_COLS * COL_WIDTH + (NUMBER_OF_COLS + 1) * MARGIN
 * - REMAINING_SPACE = WIDTH - REAL_WIDTH
 * - x = MARGIN + REMAINING_SPACE / (NUMBER_OF_COLS + 1)
 */
export const getModifiedCellGap = (
  numberOfCols: number,
  initialWidth?: number,
  fallbackWidth = 1212
) => {
  const width = initialWidth || fallbackWidth
  const margin = MARGINS[0] as number

  const realWidth = numberOfCols * COL_WIDTH + (numberOfCols + 1) * margin
  const remainingSpace = width - realWidth

  return margin + remainingSpace / (numberOfCols + 1)
}

/**
 * Calculate the number of rows that fit in a given height and return banned bottom margin
 * @description Equation for (x = bottom margin):
 * - ROW_COUNT = HEIGHT - CELL_GAP / (COL_WIDTH + CELL_GAP)
 * - REAL_HEIGHT = ROW_COUNT * COL_WIDTH + (ROW_COUNT + 1) * CELL_GAP
 * - x = HEIGHT - REAL_HEIGHT
 */
export const getBannedBottomMargin = (
  cellGap: number,
  initialHeight?: number,
  fallbackHeight = 1212
) => {
  const height = initialHeight || fallbackHeight

  const rowCount = Math.floor((height - cellGap) / (COL_WIDTH + cellGap))
  const realHeight = rowCount * COL_WIDTH + (rowCount + 1) * cellGap

  return height - realHeight
}
