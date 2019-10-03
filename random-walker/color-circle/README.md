# Random Walker
## Color Circle
A random circle walker with self avoiding path that changes colors on each draw.

# [b6c12f9](https://github.com/koz/processing-experiments/commit/b6c12f9a05767f0d3398eac2bcf7d65258dacbba)
Initial approach, with very random movement only restricting the movement to bounds of the canvas.

# [74e485d](https://github.com/koz/processing-experiments/commit/74e485d5481098f2e9582bb2c909d82c886038ad)
Added some continuity to the movement, the circle always move into a new location that's adjacent to current one. That's really limitate the graphic output, but adds a very more natural movement to the object.

# [de0a414](https://github.com/koz/processing-experiments/commit/de0a414bc9bebc7c3ba467176ab26400e1f145f2)
Back to the first algorithm, now adding only the direction. Also results in a more natural movement but the self avoind path make it produces less graphical results from the first iteration.