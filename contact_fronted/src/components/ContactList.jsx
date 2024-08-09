/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import Contact from "./Contact";

function ContactList({ data, contactPage, getAllContacts }) {
  return (
    <main className="main">
      {data?.contact?.length === 0 && (
        <div>No contacts. Please add new contacts !</div>
      )}

      <ul className="contact__List">
        {data?.contact?.length > 0 &&
          data.contact.map((contact) => (
            <Contact contact={contact} key={contact.id} />
          ))}
      </ul>

      <div className="pagination">
        <a
          onClick={getAllContacts(contactPage - 1)}
          className={0 === contactPage ? "disabled" : ""}
        >
          &laquo
        </a>
        {data && [
          ...Array(data.totalPages).map((page, index) => (
            <a
              onClick={getAllContacts(page)}
              className={contactPage === page ? "active" : ""}
              key={page}
            >
              {page + 1}
            </a>
          )),
        ]}
        <a
          onClick={getAllContacts(contactPage + 1)}
          className={data.totalPages === contactPage + 1 ? "disabled" : ""}
        >
          &rquo
        </a>
      </div>
    </main>
  );
}

export default ContactList;
