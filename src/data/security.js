import EyeIcon from '../images/icons/eye.svg?react';
import LockIcon from '../images/icons/lock.svg?react';
import ShieldIcon from '../images/icons/shield.svg?react';
import SmartphoneIcon from '../images/icons/smartphone.svg?react';

export const security = {
  features: [
    {
      title: 'Secure Online Banking Platform',
      description:
        'Our online banking platform is built with multiple layers of security to safeguard your information. We utilize industry-standard encryption protocols to ensure that your data remains confidential and protected during transmission.',
      icon: LockIcon,
    },
    {
      title: 'Multi-Factor Authentication',
      description:
        'To enhance the security of your online banking experience, we employ multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification, such as a password and a one-time verification code, to access your account.',
      icon: ShieldIcon,
    },
    {
      title: 'Fraud Monitoring',
      description:
        'We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.',
      icon: EyeIcon,
    },
    {
      title: 'Secure Mobile Banking',
      description:
        'Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions, and manage your finances on the go, knowing that your information is protected.',
      icon: SmartphoneIcon,
    },
  ],

  steps: [
    {
      title: 'Use Strong, Unique Passwords',
      description:
        'Create complex passwords that are unique to each account, combining letters, numbers, and symbols. Avoid using easily guessed information, like birthdays or pet names.',
    },
    {
      title: 'Enable Two-Factor Authentication (2FA)',
      description:
        'Add an extra layer of security to your account by enabling two-factor authentication. This will require a secondary code sent to your device to access your account.',
    },
    {
      title: 'Regularly Monitor Account Activity',
      description:
        'Periodically review your transaction history to identify any unusual activity. Report any suspicious transactions immediately.',
    },
    {
      title: 'Avoid Public Wi-Fi for Sensitive Transactions',
      description:
        'Whenever possible, avoid accessing your banking information over public Wi-Fi networks. If necessary, use a VPN to protect your data.',
    },
    {
      title: 'Beware of Phishing Scams',
      description:
        'Be cautious of unexpected emails or messages asking for personal or financial information. Verify the source before clicking links or downloading attachments.',
    },
    {
      title: 'Update Your Devices Regularly',
      description:
        'Keep your mobile and computer systems updated with the latest security patches and antivirus software to protect against cyber threats.',
    },
    {
      title: 'Log Out of Shared Devices',
      description:
        'Always log out after accessing your account on shared or public devices to prevent unauthorized access.',
    },
  ],
};
