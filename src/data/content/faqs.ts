import { ServiceFAQItem, seoFAQs } from './faqs-seo';
import { ppcFAQs } from './faqs-ppc';
import { socialMediaFAQs } from './faqs-social-media';
import { webDevFAQs } from './faqs-web-development';
import { videoPhotoFAQs } from './faqs-video-photo';

export type { ServiceFAQItem };
export { seoFAQs, ppcFAQs, socialMediaFAQs, webDevFAQs, videoPhotoFAQs };

export function getServiceFaqs(serviceSlug: string): ServiceFAQItem[] {
  switch (serviceSlug) {
    case 'seo':
      return seoFAQs;
    case 'ppc':
    case 'meta-ads':
      return ppcFAQs;
    case 'social-media':
      return socialMediaFAQs;
    case 'web-development':
      return webDevFAQs;
    case 'video-photo':
      return videoPhotoFAQs;
    default:
      return [];
  }
}
