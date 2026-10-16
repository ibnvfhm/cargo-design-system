import { TextArea } from '@cargo/react';

export default function TextAreaError() {
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <TextArea
        label="Alasan pengajuan"
        required
        rows={3}
        description="Dibaca oleh atasanmu."
        error="Alasan wajib diisi."
      />
    </div>
  );
}
