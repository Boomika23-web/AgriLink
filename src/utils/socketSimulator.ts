import { SocketNotification } from '../types';

type ListenerCallback = (notification: SocketNotification) => void;

class AgriLinkSocketSimulator {
  private listeners: ListenerCallback[] = [];
  private history: SocketNotification[] = [
    {
      id: 'notif-init-1',
      timestamp: 'Today, 09:30 AM',
      event: 'order_received',
      target: 'farmer',
      message: 'New order received! Order #AGRI-8492 (Country Tomatoes × 5kg)',
      orderId: 'AGRI-8492',
      unread: false
    },
    {
      id: 'notif-init-2',
      timestamp: 'Today, 09:32 AM',
      event: 'order_confirmed',
      target: 'consumer',
      message: 'Your order #AGRI-8492 has been confirmed by Farmer Ramesh Kumar.',
      orderId: 'AGRI-8492',
      unread: false
    },
    {
      id: 'notif-init-3',
      timestamp: 'Today, 09:40 AM',
      event: 'order_ready',
      target: 'consumer',
      message: 'Your order #AGRI-8490 is ready for direct pickup / delivery.',
      orderId: 'AGRI-8490',
      unread: false
    }
  ];

  public subscribe(cb: ListenerCallback): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public emitNotification(event: string, message: string, target: string = 'all', orderId?: string) {
    const notif: SocketNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: 'Just now',
      event,
      target,
      message,
      orderId,
      unread: true
    };

    this.history.unshift(notif);
    if (this.history.length > 50) this.history.pop();

    this.listeners.forEach((listener) => {
      try {
        listener(notif);
      } catch (err) {
        console.error('Socket notification dispatch error:', err);
      }
    });

    return notif;
  }

  public getHistory(): SocketNotification[] {
    return [...this.history];
  }
}

export const socketSimulator = new AgriLinkSocketSimulator();
