import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

class YoutubeTag extends Tag {
    toReact() {
        // using this.getContent(true) to get it's inner raw text.
        const attributes = {
            src: this.getContent(true),
            width: this.params.width || 560,
            height: this.params.height || 315,
        };
        return (
            <iframe
                {...attributes}
                frameBorder="0"
                allowFullScreen
            />
        );
    }
}

parser.registerTag('youtube', YoutubeTag);
export {parser};