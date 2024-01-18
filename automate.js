
var find = new FileFind
var srcDir = jsArguments[0]
if (find.begin(srcDir + "/*_solved.fits")) {
   do {
      var orig = srcDir + "/" + find.name;
      var starless = createStarlessImage(orig);
      createStretchedImage(orig);
      createStretchedImage(starless);
   } while (find.next());
}
console.writeln("Done!")

function ifNotExists(filePath, tag, fn) {
   var baseName = filePath.substring(0, filePath.lastIndexOf("."))
   var fileFormat = filePath.substring(filePath.lastIndexOf("."))
   var find = new FileFind
   var lookup = baseName + "_" + tag  + ".fits"
   if (find.begin(lookup)) {
      console.writeln("Skipping " + filePath + " as " + tag + " version already exists");
   } else {
      fn(baseName, fileFormat)
   }
   return lookup;
}

function createStarlessImage(filePath) {
   return ifNotExists(filePath, "starless", function (baseName, fileFormat) {
      var P = new StarXTerminator;
      P.ai_file = "StarXTerminator.lite.nonoise.11.pb";
      P.stars = false;
      P.unscreen = false;
      P.overlap = 0.20;
      var window = ImageWindow.open(filePath);
      var image = window[0].mainView;
      P.executeOn(image)

      var starless = baseName + "_starless.fits"
      image.window.saveAs(starless, false, false, true, false);

      image.window.forceClose();
   });
}

function createStretchedImage(filePath) {
   return ifNotExists(filePath, "stretched", function (baseName, fileFormat) {

      var window = ImageWindow.open(filePath);
      var view = window[0].mainView;
      var image = view.image;
      var histogram = new Histogram(image);
      var P = new GeneralizedHyperbolicStretch;
      P.stretchType = GeneralizedHyperbolicStretch.prototype.ST_GeneralisedHyperbolic;
      P.stretchChannel = GeneralizedHyperbolicStretch.prototype.SC_RGB;
      P.inverse = false;
      P.stretchFactor = 2;
      P.localIntensity = 8.000;
      P.symmetryPoint = histogram.normalizedPeakLevel;
      P.highlightProtection = 1.000000;
      P.shadowProtection = 0.000000;
      P.blackPoint = 0.000000;
      P.whitePoint = 1.000000;
      P.colourBlend = 1.000;
      P.clipType = GeneralizedHyperbolicStretch.prototype.CT_RGBBlend;
      P.useRGBWorkingSpace = false;
      P.executeOn(view)

      for (var i = 0; i < 2; i++) {
         histogram = new Histogram(image);
         P.stretchFactor = 2;
         P.localIntensity = 8 - 2 * i;
         P.symmetryPoint = 1.1 * histogram.normalizedPeakLevel;
         P.executeOn(view)
         view.window.saveAs(baseName + "_stretched.fits", false, false, true, false);

      }
      view.window.forceClose();
   });
}
