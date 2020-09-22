import vueHeadful from 'vue-headful';
import VueRouter from 'vue-router';

import get from 'lodash.get';

export default {
    install: (Vue, options) => {
        Vue.component('vue-headful', vueHeadful);

        if (!(get(options, 'router') instanceof VueRouter)) {
            console.log('Router is not instance of VueRouter');
            return false;
        }

        const bExistI18N = get(options, 'i18n.constructor.name', null) === 'VueI18n';

        Vue.prototype.$metaTags = {
            h1: '',
            title: '',
            description: '',
            keywords: '',
        };

        options.router.beforeEach((to, from, next) => {
            let h1 = '';
            let title = '';
            let description = '';
            let keywords = '';

            if (get(to, 'meta.metaTags', null) === null) {
                next();
                return;
            }
            const oMetaTags = to.meta.metaTags;

            if (bExistI18N && oMetaTags.i18n_title) {
                title = options.i18n.t(oMetaTags.i18n_title);
            }
            else if (oMetaTags.title) {
                title = oMetaTags.title;
            }

            if (bExistI18N && oMetaTags.i18n_h1) {
                h1 = options.i18n.t(oMetaTags.i18n_h1);
            }
            else if (oMetaTags.h1) {
                h1 = oMetaTags.h1;
            }

            if (bExistI18N && oMetaTags.i18n_description) {
                description = options.i18n.t(oMetaTags.i18n_description);
            }
            else if (oMetaTags.description) {
                description = oMetaTags.description;
            }

            if (bExistI18N && oMetaTags.i18n_keywords) {
                keywords = options.i18n.t(oMetaTags.i18n_keywords);
            }
            else if (oMetaTags.keywords) {
                keywords = oMetaTags.keywords;
            }

            if (to.params) {
                for (const sParamName in to.params) {
                    h1 = h1.replace(':' + sParamName, to.params[sParamName]);
                    title = title.replace(':' + sParamName, to.params[sParamName]);
                    description = description.replace(':' + sParamName, to.params[sParamName]);
                    keywords = keywords.replace(':' + sParamName, to.params[sParamName]);
                }
            }

            Vue.prototype.$metaTags.h1 = h1;
            Vue.prototype.$metaTags.title = title;
            Vue.prototype.$metaTags.description = description;
            Vue.prototype.$metaTags.keywords = keywords;

            next();
        });
    },
};
