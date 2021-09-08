declare module "markdown-it-regexp" {
    function markdownPlugin(
         regexp: RegExp,
         matchFunction: (match: RegExpExecArray) => string
         
     ): any;
     export = markdownPlugin;
 }