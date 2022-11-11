import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
// import Comment from "./Comment";
import { FriendOfUser } from "./FriendOfPerson";
import Post from "./Post";
// import Reaction from "./Reaction";

@Entity()
export default class User extends BaseEntity {
	//Atributes

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column({ name: "nick_name", nullable: true })
	nickName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ default: false })
	confirmed: boolean;

	@Column()
	birthday: string;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
	updatedAt: Date;

	// Relationships

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];

	// @OneToMany(() => Comment, (comment) => comment.user)
	// comments: Comment[];

	// @OneToMany(() => Reaction, (reaction) => reaction.user)
	// reactions: Reaction[];

  @OneToMany(() => FriendOfUser, (friend) => friend.user)
	friends: FriendOfUser[];

  @OneToMany(() => FriendOfUser, (friend) => friend.follower)
	follows: FriendOfUser[];
}
