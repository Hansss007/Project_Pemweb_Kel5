function Contact() {
    return (
      <div className="page">
        <h2>Kontak</h2>
        <form>
          <label>Nama:</label><br />
          <input type="text" /><br />
          <label>Pesan:</label><br />
          <textarea></textarea><br />
          <button type="submit">Kirim</button>
        </form>
      </div>
    );
  }
  
  export default Contact;