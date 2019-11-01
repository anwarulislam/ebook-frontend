import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class SeoService {

    constructor(private meta: Meta, private title: Title) { }

    generateTags(config) {
        // default values
        config = {
            title: '10 Minute School - ',
            description: 'Free Educational Platform to learn JSC, SSC, HSC, Admission Test, Skill Development, Professional Courses with augmented reality, videos, interactive videos, quizzes, model tests, smart books, live classes &amp; blogs.',
            image: 'http://10minuteschool.com/wp-content/uploads/2016/01/Thumb-new-1024x384.jpg',
            slug: '',
            twitter_user: '@anwaarulislaam',
            twitter_card: 'summary',
            fb_user: 'article',
            fb_type: '10minuteschool',
            keywords: 'JSC, SSC, HSC, Admission, Skill Development, Professional Courses, 10MS, 10 Minute School',
            ...config
        }

        this.title.setTitle(config.title + ' - 10 Minute School')

        //For google
        this.meta.updateTag({ name: 'description', content: config.description });
        this.meta.updateTag({ name: 'keywords', content: config.keywords });

        //For twitter
        this.meta.updateTag({ name: 'twitter:card', content: config.twitter_card });
        this.meta.updateTag({ name: 'twitter:site', content: config.twitter_user });
        this.meta.updateTag({ name: 'twitter:title', content: config.title });
        this.meta.updateTag({ name: 'twitter:description', content: config.description });
        this.meta.updateTag({ name: 'twitter:image', content: config.image });

        //For Facebook
        this.meta.updateTag({ property: 'og:type', content: config.fb_user });
        this.meta.updateTag({ property: 'og:site_name', content: config.fb_user });
        this.meta.updateTag({ property: 'og:title', content: config.title });
        this.meta.updateTag({ property: 'og:description', content: config.description });
        this.meta.updateTag({ property: 'og:image', content: config.image });
        this.meta.updateTag({ property: 'og:url', content: `http://10minuteschool.com/${config.slug}` });
    }

    get windowRef() {
        return window
    }

    resetMeta() {
        this.generateTags({
            title: '10 Minute School',
            description: 'Free Educational Platform to learn JSC, SSC, HSC, Admission Test, Skill Development, Professional Courses with augmented reality, videos, interactive videos, quizzes, model tests, smart books, live classes &amp; blogs.',
            image: 'http://10minuteschool.com/wp-content/uploads/2016/01/Thumb-new-1024x384.jpg',
            slug: '',
            twitter_user: '@anwaarulislaam',
            twitter_card: 'summary',
            fb_user: 'article',
            fb_type: '10minuteschool',
            keywords: 'JSC, SSC, HSC, Admission, Skill Development, Professional Courses, 10MS, 10 Minute School',
        })

    }

}