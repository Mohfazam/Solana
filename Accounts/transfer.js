const {Keypair, Connection, SystemProgram, Transaction} = require("@solana/web3.js");

const payer = Keypair.fromSecretKey(Uint8Array.from([]));

const connection = new Connection("https://api.devnet.solana.com");

async function main() {
    const newAccount = Keypair.generate();
    const transaction = new Transaction();

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: newAccount.publicKey,
            lamports: 0.01 * 100000000,
        })
    );

    await connection.sendTransaction(transaction, [payer]);

    console.log(`Transferred to ${newAccount.publicKey.toBase58()}`);
};

main();


// const bs58 = require("bs58");

// const base58PrivateKey = "2QgVokTu3PYXFYXQiZZFF8zohnX7Cd4WQQ1NpEnQhx66TmazdwGVZLV7wzKho6qEc8jGD7acxCBJr9fNveb3c6Ku";

// const uint8Array = bs58.decode(base58PrivateKey);

// // Convert to comma-separated string
// const formatted = `Uint8Array.from([${Array.from(uint8Array).join(', ')}])`;

// console.log(formatted);

