import { Request, Response } from "express";

import jwt = require("jsonwebtoken");
import User from "../entities/User";
import Encrypter from "../services/encrypter";
import UserValidator from "../validator/UserValidator";

export default class UserController {
	public async register(req: Request, res: Response) {
		const validator = new UserValidator();
		try {
			const { error, value } = validator.register(req.body);
			if (!error) {
				value.password = Encrypter.encrypt(value.password, Encrypter.hash(value));
				const model = await User.save(value);
				// Mail.sendMail(value.email, "Email de verificação", "Para configurar seu email use o seguinte código: top")
				return res.send(model);
			}
			return res.status(400).send(error);
		} catch (error) {
			return res.status(403).send("Email já existe");
		}
	}

	public async edit(req: Request, res: Response) {
		const validator = new UserValidator();
		try {
			const { error, value } = validator.edit(req.body);
			if (!error) {
				const user = await User.findOne({
					where: { id: res.locals.id },
				});

				let hash = Encrypter.hash({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					birthday: user.birthday,
				});

				user.password = Encrypter.decrypt(user.password, hash);

				if (value.firstName) user.firstName = value.firstName;
				if (value.lastName) user.lastName = value.lastName;
				if (value.nickName) user.nickName = value.nickName;
				if (value.email) user.email = value.email;
				if (value.birthday) user.birthday = value.birthday;

				hash = Encrypter.hash({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					birthday: user.birthday,
				});

				user.password = Encrypter.encrypt(user.password, hash);

				const model = User.save(user);

				return res.send(model);
			}
			return res.status(400).send(error);
		} catch (error) {
			return res.status(403).send(error);
		}
	}

	public async login(req: Request, res: Response) {
		const validator = new UserValidator();
		const { error, value } = validator.login(req.body);
		if (!error) {
			const user = await User.findOne({
				where: { email: value.email },
			});

			if (!user) return res.status(404).send({ error: "Email não encontrado" });

			const hash = Encrypter.hash({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				birthday: user.birthday,
			});

			if (value.password === Encrypter.decrypt(user.password, hash)) {
				return res.send({
					success: true,
					token: jwt.sign({ userId: user.id }, "ENCRYPT", { expiresIn: "24h" }),
				});
			}
			return res.send({ success: false });
		}
		return res.status(400).send(error);
	}

	public async changePassword(req: Request, res: Response) {
		const validator = new UserValidator();
		const { error, value } = validator.changePassword(req.body);
		if (!error) {
			const user = await User.findOne({
				where: { id: res.locals.id },
			});

			if (!user) {
				return res.status(404).send({ error: "Usuário não encontrado" });
			}

			const hash = Encrypter.hash({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				birthday: user.birthday,
			});

			if (value.actualPassword !== Encrypter.decrypt(user.password, hash))
				return res.status(403).send({ error: "Passwords don't match" });

			value.password = Encrypter.encrypt(value.password, hash);
			const model = await User.save(User.merge(user, value) as User);
			return res.send(model);
		}

		return res.status(400).send(error);
	}
}
