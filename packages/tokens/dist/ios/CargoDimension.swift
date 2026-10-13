
//
// CargoDimension.swift
//

// Jangan edit file ini langsung.
// Dibuat otomatis dari packages/tokens/src dengan `npm run build`.


import SwiftUI

public enum CargoDimension {
    public static let space0 = CGFloat(0.00) /** Tanpa jarak. */
    public static let space2 = CGFloat(2.00) /** Jarak paling rapat, misalnya antara label dan teks bantuan di input. */
    public static let space4 = CGFloat(4.00) /** Jarak rapat, misalnya antara ikon dan teks di badge atau checkbox. */
    public static let space6 = CGFloat(6.00) /** Jarak rapat untuk komponen kecil, misalnya ikon dan teks di tombol kecil. */
    public static let space8 = CGFloat(8.00) /** Jarak umum antarelemen di dalam komponen, misalnya ikon dan teks di tombol. */
    public static let space12 = CGFloat(12.00) /** Padding komponen kecil, misalnya tombol dan chip. */
    public static let space16 = CGFloat(16.00) /** Padding standar kartu, modal, dan tooltip. */
    public static let space20 = CGFloat(20.00) /** Jarak antarkelompok di dalam kartu atau form. */
    public static let space24 = CGFloat(24.00) /** Jarak antarkelompok yang lebih longgar, misalnya antarbagian form. */
    public static let space32 = CGFloat(32.00) /** Jarak antarbagian di dalam modal atau halaman. */
    public static let space40 = CGFloat(40.00) /** Jarak antarbagian halaman. */
    public static let space48 = CGFloat(48.00) /** Jarak antarbagian halaman yang besar. */
    public static let space64 = CGFloat(64.00) /** Jarak antar-section di website. */
    public static let space80 = CGFloat(80.00) /** Jarak antar-section besar di website. */
    public static let space96 = CGFloat(96.00) /** Jarak antar-section besar di website. */
    public static let space128 = CGFloat(128.00) /** Jarak antar-section paling besar di website. */
    public static let radius0 = CGFloat(0.00) /** Sudut tajam. */
    public static let radius2 = CGFloat(2.00) /** Sudut sangat kecil, misalnya checkbox kecil. */
    public static let radius4 = CGFloat(4.00) /** Sudut kecil, misalnya checkbox dan langkah di stepper. */
    public static let radius6 = CGFloat(6.00) /** Sudut input (text field, search bar, text area) dan tombol kecil. */
    public static let radius8 = CGFloat(8.00) /** Sudut standar: tombol sedang, modal, tooltip, dan section message. */
    public static let radius12 = CGFloat(12.00) /** Sudut besar, misalnya kartu besar. */
    public static let radius16 = CGFloat(16.00) /** Sudut sangat besar, misalnya bottom sheet. */
    public static let radiusFull = CGFloat(9999.00) /** Bentuk pil dan lingkaran: badge, toggle, radio, avatar. */
    public static let borderWidth1 = CGFloat(1.00) /** Garis standar: input, kartu, dan pemisah. */
    public static let borderWidth2 = CGFloat(2.00) /** Garis tebal: input yang fokus atau terpilih, dan cincin fokus. */
}