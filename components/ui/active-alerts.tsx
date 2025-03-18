import { getPayload } from 'payload';
import config from '@payload-config';
import { AlertBanner } from './alert-banner';

interface Alert {
  id: string;
  title: string;
  isActive: boolean;
  alertType: 'info' | 'warning' | 'error' | 'success';
  content: any;
  position: 'global' | 'home';
  dismissible: boolean;
  expiresAt?: string;
}

interface ActiveAlertsProps {
  position?: 'global' | 'home';
}

// Fetch active alerts from Payload CMS
async function getActiveAlerts(position?: string): Promise<Alert[]> {
  try {
    const payload = await getPayload({ config });
    
    // Build query for active alerts
    const query: any = {
      isActive: {
        equals: true,
      },
    };
    
    // Add position filter if provided
    if (position) {
      query.position = {
        equals: position,
      };
    }
    
    // Add expiration date check
    query.or = [
      {
        expiresAt: {
          exists: false,
        },
      },
      {
        expiresAt: {
          greater_than: new Date().toISOString(),
        },
      },
    ];
    
    const alerts = await payload.find({
      collection: 'alerts',
      where: query,
      sort: '-createdAt', // Show newest first
    }).then(res => res.docs as Alert[]);
    
    return alerts;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
}

export async function ActiveAlerts({ position }: ActiveAlertsProps) {
  const alerts = await getActiveAlerts(position);
  
  if (!alerts.length) return null;
  
  return (
    <>
      {alerts.map(alert => (
        <AlertBanner
          key={alert.id}
          alertType={alert.alertType}
          content={alert.content}
          dismissible={alert.dismissible}
          localStorageKey={`alert-${alert.id}-dismissed`}
        />
      ))}
    </>
  );
} 