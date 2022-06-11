const Imap = require('imap');
const {simpleParser} = require('mailparser');

module.exports.readEmail = function(req,res){
    let reqestObject =req.body;
    const imapConfig = {
        user: reqestObject.email,
        password:reqestObject.password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
    };
    console.log("imapConfig",imapConfig)
    try {
        const imap = new Imap(imapConfig);
        imap.once('ready', () => {
          imap.openBox('INBOX', false, () => {
            imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
              const f = imap.fetch(results, {bodies: ''});
              f.on('message', msg => {
                msg.on('body', stream => {
                  simpleParser(stream, async (err, parsed) => {
                    // const {from, subject, textAsHtml, text} = parsed;
                    // console.log(parsed);
                    res.send({message : "Email data" , parsed})
                    /* Make API call to save the data
                       Save the retrieved data into a database.
                       E.t.c
                    */
                  });
                });
                msg.once('attributes', attrs => {
                  const {uid} = attrs;
                //   imap.addFlags(uid, ['\\Seen'], () => {
                //     // Mark the email as read after reading it
                //     console.log('Marked as read!');
                //   });
                });
              });
              f.once('error', ex => {
                return Promise.reject(ex);
              });
              f.once('end', () => {
                console.log('Done fetching all messages!');
                imap.end();
              });
            });
          });
        });
    
        imap.once('error', err => {

          console.log(err);
          res.send({message : "Email error" , err})
        });
    
        imap.once('end', () => {
          console.log('Connection ended');
        });
    
        imap.connect();
      } catch (ex) {
        console.log('an error occurred');
      }
    console.log("call")
}