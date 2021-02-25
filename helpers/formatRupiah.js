function formatRupiah(num) {
  let inRupiah = num.toLocaleString("id-ID")
  return `Rp. ${inRupiah},00`

}

module.exports = formatRupiah