export interface Notification {
  id: number;
  type: string;
  message: string;
}

export interface NotificationsStateInterface {
  notifications: Array<Notification>;
}

function state (): NotificationsStateInterface {
  return {
    notifications: []
  }
}

export default state
