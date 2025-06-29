import { toast } from 'react-hot-toast';

const baseStyle = {
  fontSize: '0.875rem', 
  padding: '8px 12px',
  borderRadius: '6px',
  fontWeight: '500',
};

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    duration: 3000,
    style: {
      ...baseStyle,
      background: '#DFF6DD',
      color: '#256029',
    },
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    duration: 3000,
    style: {
      ...baseStyle,
      background: '#FEE2E2',
      color: '#991B1B',
    },
  });
};

export const handleInfo = (msg) => {
  toast(msg, {
    position: 'top-right',
    duration: 3000,
    style: {
      ...baseStyle,
      background: '#DBEAFE',
      color: '#1E3A8A',
    },
  });
};
