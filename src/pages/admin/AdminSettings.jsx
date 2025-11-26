import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { AdminRoute } from '@/components/admin/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  Save,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Globe,
  Database,
  Users,
  Car,
  Calendar,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export const AdminSettings = () => {
  const { admin } = useAdmin();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'CarRental Pro',
    siteDescription: 'Premium Car Rental Service',
    contactEmail: 'admin@carrental.com',
    contactPhone: '+91 9876543210',
    baseLocation: 'New Delhi, India',
    
    // Booking Settings
    minRentalDays: 1,
    maxRentalDays: 30,
    advanceBookingDays: 60,
    cancellationHours: 24,
    
    // Payment Settings
    currency: 'INR',
    taxRate: 18,
    securityDeposit: 5000,
    paymentMethods: ['credit_card', 'debit_card', 'upi', 'net_banking'],
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    bookingConfirmations: true,
    reminderAlerts: true,
    promotionEmails: false,
    
    // Security Settings
    requireEmailVerification: true,
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordExpiry: 90,
    
    // System Settings
    maintenanceMode: false,
    enableAnalytics: true,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Settings saved:', settings);
    setIsSaving(false);
    // Show success message
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      console.log('Settings reset');
      // Implement reset functionality
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwitchChange = (field, checked) => {
    setSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'booking', label: 'Booking', icon: Calendar },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Database }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="siteName" className="mb-2">Site Name</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="contactEmail" className="mb-2">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="siteDescription" className="mb-2">Site Description</Label>
        <Input
          id="siteDescription"
          value={settings.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contactPhone" className="mb-2">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={settings.contactPhone}
            onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="baseLocation" className="mb-2">Base Location</Label>
          <Input
            id="baseLocation"
            value={settings.baseLocation}
            onChange={(e) => handleInputChange('general', 'baseLocation', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderBookingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="minRentalDays" className="mb-2">Minimum Rental Days</Label>
          <Input
            id="minRentalDays"
            type="number"
            min="1"
            value={settings.minRentalDays}
            onChange={(e) => handleInputChange('booking', 'minRentalDays', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="maxRentalDays" className="mb-2">Maximum Rental Days</Label>
          <Input
            id="maxRentalDays"
            type="number"
            min="1"
            value={settings.maxRentalDays}
            onChange={(e) => handleInputChange('booking', 'maxRentalDays', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="advanceBookingDays" className="mb-2">Advance Booking (Days)</Label>
          <Input
            id="advanceBookingDays"
            type="number"
            min="1"
            value={settings.advanceBookingDays}
            onChange={(e) => handleInputChange('booking', 'advanceBookingDays', parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="cancellationHours" className="mb-2">Cancellation Notice (Hours)</Label>
        <Input
          id="cancellationHours"
          type="number"
          min="1"
          value={settings.cancellationHours}
          onChange={(e) => handleInputChange('booking', 'cancellationHours', parseInt(e.target.value))}
        />
        <p className="text-sm text-gray-500 mt-1">Free cancellation before this period</p>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="currency" className="mb-2">Currency</Label>
          <select
            id="currency"
            value={settings.currency}
            onChange={(e) => handleInputChange('payment', 'currency', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>
        <div>
          <Label htmlFor="taxRate" className="mb-2">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            min="0"
            max="100"
            value={settings.taxRate}
            onChange={(e) => handleInputChange('payment', 'taxRate', parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="securityDeposit" className="mb-2">Security Deposit (₹)</Label>
        <Input
          id="securityDeposit"
          type="number"
          min="0"
          value={settings.securityDeposit}
          onChange={(e) => handleInputChange('payment', 'securityDeposit', parseInt(e.target.value))}
        />
      </div>
      
      <div>
        <Label className="mb-3">Payment Methods</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['credit_card', 'debit_card', 'upi', 'net_banking'].map(method => (
            <div key={method} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={method}
                checked={settings.paymentMethods.includes(method)}
                onChange={(e) => {
                  const updatedMethods = e.target.checked
                    ? [...settings.paymentMethods, method]
                    : settings.paymentMethods.filter(m => m !== method);
                  handleInputChange('payment', 'paymentMethods', updatedMethods);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor={method} className="capitalize">
                {method.replace('_', ' ')}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
            <p className="text-sm text-gray-500">Send email notifications for important events</p>
          </div>
          <Switch
            id="emailNotifications"
            checked={settings.emailNotifications}
            onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="smsNotifications" className="text-base">SMS Notifications</Label>
            <p className="text-sm text-gray-500">Send SMS alerts for bookings and reminders</p>
          </div>
          <Switch
            id="smsNotifications"
            checked={settings.smsNotifications}
            onCheckedChange={(checked) => handleSwitchChange('smsNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="bookingConfirmations" className="text-base">Booking Confirmations</Label>
            <p className="text-sm text-gray-500">Send confirmation emails for new bookings</p>
          </div>
          <Switch
            id="bookingConfirmations"
            checked={settings.bookingConfirmations}
            onCheckedChange={(checked) => handleSwitchChange('bookingConfirmations', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="reminderAlerts" className="text-base">Reminder Alerts</Label>
            <p className="text-sm text-gray-500">Send reminder alerts before pickup dates</p>
          </div>
          <Switch
            id="reminderAlerts"
            checked={settings.reminderAlerts}
            onCheckedChange={(checked) => handleSwitchChange('reminderAlerts', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="promotionEmails" className="text-base">Promotion Emails</Label>
            <p className="text-sm text-gray-500">Send promotional offers and updates</p>
          </div>
          <Switch
            id="promotionEmails"
            checked={settings.promotionEmails}
            onCheckedChange={(checked) => handleSwitchChange('promotionEmails', checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="requireEmailVerification" className="text-base">Email Verification</Label>
            <p className="text-sm text-gray-500">Require email verification for new users</p>
          </div>
          <Switch
            id="requireEmailVerification"
            checked={settings.requireEmailVerification}
            onCheckedChange={(checked) => handleSwitchChange('requireEmailVerification', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="twoFactorAuth" className="text-base">Two-Factor Authentication</Label>
            <p className="text-sm text-gray-500">Enable 2FA for admin accounts</p>
          </div>
          <Switch
            id="twoFactorAuth"
            checked={settings.twoFactorAuth}
            onCheckedChange={(checked) => handleSwitchChange('twoFactorAuth', checked)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="sessionTimeout" className="mb-2">Session Timeout (Minutes)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            min="5"
            value={settings.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="passwordExpiry" className="mb-2">Password Expiry (Days)</Label>
          <Input
            id="passwordExpiry"
            type="number"
            min="1"
            value={settings.passwordExpiry}
            onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="maintenanceMode" className="text-base">Maintenance Mode</Label>
            <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
          </div>
          <Switch
            id="maintenanceMode"
            checked={settings.maintenanceMode}
            onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enableAnalytics" className="text-base">Enable Analytics</Label>
            <p className="text-sm text-gray-500">Collect and analyze user data</p>
          </div>
          <Switch
            id="enableAnalytics"
            checked={settings.enableAnalytics}
            onCheckedChange={(checked) => handleSwitchChange('enableAnalytics', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="autoBackup" className="text-base">Automatic Backups</Label>
            <p className="text-sm text-gray-500">Automatically backup system data</p>
          </div>
          <Switch
            id="autoBackup"
            checked={settings.autoBackup}
            onCheckedChange={(checked) => handleSwitchChange('autoBackup', checked)}
          />
        </div>
      </div>
      
      {settings.autoBackup && (
        <div>
          <Label htmlFor="backupFrequency" className="mb-2">Backup Frequency</Label>
          <select
            id="backupFrequency"
            value={settings.backupFrequency}
            onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )}
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-800 mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium">Danger Zone</span>
        </div>
        <p className="text-yellow-700 text-sm mb-4">
          Resetting settings will restore all configurations to their default values. This action cannot be undone.
        </p>
        <Button
          variant="outline"
          onClick={handleResetSettings}
          className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset to Default
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'booking': return renderBookingSettings();
      case 'payment': return renderPaymentSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'system': return renderSystemSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <AdminRoute>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600">Configure your car rental system preferences</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleResetSettings}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${
                        activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </CardTitle>
              <CardDescription>
                Configure {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} preferences for your car rental system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminRoute>
  );
};

export default AdminSettings;