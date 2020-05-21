import xlsIcon from './xls.svg';
import vidAudIcon from './vid-aud.svg';
import pptIcon from './ppt.svg';
import pdfIcon from './pdf.svg';
import otherIcon from './other.svg';
import imageIcon from './img.svg';
import folderIcon from './folder.svg';
import docIcon from './doc.svg';

function mimeIconDict(mime) {
  const mimeSplit = mime.split('/');
  const type = mimeSplit[0];
  const spec = mimeSplit[1];
  switch (type) {
    case 'image':
      return imageIcon;
    case 'video':
    case 'audio':
      return vidAudIcon;
    case 'application':
      switch (spec) {
        default:
          return otherIcon;
      }
    default:
      return otherIcon;
  }
}
