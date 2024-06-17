import { notifications } from '@mantine/notifications';

const addNotification = ({
  autoClose = 4000,
  color = 'teal',
  limit = 5,
  message = 'Hey there, your code is awesome! 🤥',
  position = 'bottom-right',
  title = 'Default notification',
  type = 'success',
}): void => {
  const notification = {
    autoClose,
    color,
    limit,
    message,
    position,
    title,
  };

  if (type === 'error') {
    notification.color = 'red';
  }

  if (type === 'info') {
    notification.color = 'blue';
  }

  notifications.show(notification);
};

export { addNotification };
