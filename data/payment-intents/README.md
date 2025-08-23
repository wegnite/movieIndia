# Payment Intent Data Storage

This directory contains payment intent tracking data stored as JSON files.

## Structure

- `payment-intents-YYYY-MM-DD.json` - Daily payment intent data
- `.locks/` - Directory for file locking mechanisms
- Files are automatically rotated when they exceed size limits

## Privacy Notice

All data files are excluded from git tracking for privacy and security reasons.
Only the directory structure and documentation are version controlled.

## Data Retention

Files older than the configured retention period (default: 365 days) are automatically cleaned up.

## File Format

Each JSON file contains an array of PaymentIntentRecord objects with:
- Payment intent data (timestamp, plan, amount, etc.)
- Metadata (file version, save time)
- Session tracking information

## Security

- File locking prevents concurrent write corruption
- Atomic writes ensure data integrity
- Session IDs are hashed for privacy
- IP addresses and user agents are stored for analytics only