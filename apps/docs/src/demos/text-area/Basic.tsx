import { TextArea } from '@cargo/react';

export default function TextAreaBasic() {
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <TextArea
        label="Alamat lengkap"
        placeholder="Nama jalan, nomor rumah, RT/RW"
        description="Tulis patokan kalau alamat sulit ditemukan."
      />
    </div>
  );
}
