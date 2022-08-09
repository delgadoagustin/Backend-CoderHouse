import bcrypt from "bcrypt";

const bcrypt_functions = {
    createHash: async (password) => {
        const saltRounds = 10;
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default bcrypt_functions