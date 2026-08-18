import AaryanImage from './AaryanImage.jpg';
import AaryanPatel_Resume from './AaryanPatel_Resume.pdf';

const certificateGlob = import.meta.glob('./*.*', { eager: true });

export function getCertificateUrl(filename) {
    if (!filename) return '';
    const matchKey = Object.keys(certificateGlob).find((key) => key.endsWith(filename));
    if (matchKey && certificateGlob[matchKey]) {
        return certificateGlob[matchKey].default || certificateGlob[matchKey];
    }
    return filename.startsWith('/') ? filename : `/${filename}`;
}

export const RESUME_PDF_URL = AaryanPatel_Resume;
export const AARYAN_AVATAR = AaryanImage;
