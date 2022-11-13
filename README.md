# nft

Instructions:

1. In terminal, do npm i
2. Make changes in the schema.js file.
3. Exceute following commands in the terminal.
   cd server
   node schema.js
   npm run devStart
4. Make a new terminal window
5. Exceute following commands in the new terminal.
   cd client
   npm start

About this Project:

1. Dashboard will show the nft owned by the customer.
2. Once you buy with Name and TokenId, the NFT will be shown in the dashboard. That particular NFT will not be shown in the Buy NFT Page.
3. In NFT Table: is_avl is the NFT that are available(1-> available, 0-> not available).
4. Every manager has some mancode in the login table. Only those users can go to Manager dashboard.

BUGS

1. Currently we are updating the NFT_Owned table login_id(lid) column with hardcoded 1. Have to fix this to automatically store the login_id of the customer.
