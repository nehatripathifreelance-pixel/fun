
export interface SupportRequest {
  id: string;
  user: string;
  type: 'Feedback' | 'Complaint' | 'Support' | 'Request';
  message: string;
  date: string;
  status: 'Pending' | 'Resolved' | 'In Progress';
}

class SupportService {
  private requests: SupportRequest[] = [
    { 
      id: '1', 
      user: 'Priya Patel', 
      type: 'Feedback', 
      message: 'Excellent quality milk, delivered right on time!', 
      date: '2024-03-05',
      status: 'Resolved'
    },
    { 
      id: '2', 
      user: 'Amit Sharma', 
      type: 'Support', 
      message: 'Good service, but the app could be faster.', 
      date: '2024-03-04',
      status: 'In Progress'
    },
    { 
      id: '3', 
      user: 'Rahul V.', 
      type: 'Complaint', 
      message: 'Product was good, but delivery was delayed by 30 mins.', 
      date: '2024-03-03',
      status: 'Pending'
    }
  ];

  private listeners: (() => void)[] = [];

  getRequests() {
    return [...this.requests];
  }

  addRequest(request: Omit<SupportRequest, 'id' | 'date' | 'status'>) {
    const newRequest: SupportRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    this.requests = [newRequest, ...this.requests];
    this.notify();
  }

  updateStatus(id: string, status: SupportRequest['status']) {
    this.requests = this.requests.map(req => 
      req.id === id ? { ...req, status } : req
    );
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const supportService = new SupportService();
