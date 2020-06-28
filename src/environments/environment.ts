// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // base_url:'http://api.myfantasygame.com/',
  // video_category_image_url:'http://api.myfantasygame.com/uploads/video_category/',
  // image_category_image_url:'http://api.myfantasygame.com/uploads/image_category/',
  // video_url:'http://api.myfantasygame.com/uploads/video/',
  // video_thumbnail_img_url:'http://api.myfantasygame.com/uploads/thumbnail_img/',
  // image_url:'http://api.myfantasygame.com/uploads/image/',
  // text_category_image_url:'http://api.myfantasygame.com/uploads/text_category/',
  base_url:'http://localhost:8080/',
  video_category_image_url:'http://localhost:8080/uploads/video_category/',
  image_category_image_url:'http://localhost:8080/uploads/image_category/',
  video_url:'http://localhost:8080/uploads/video/',
  video_thumbnail_img_url:'http://localhost:8080/uploads/thumbnail_img/',
  image_url:'http://localhost:8080/uploads/image/',
  text_category_image_url:'http://localhost:8080/uploads/text_category/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
