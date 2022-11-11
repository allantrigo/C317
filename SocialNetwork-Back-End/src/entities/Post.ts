import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
    OneToMany,
} from "typeorm";
// import Comment from "./Comment";
// import Reaction from "./Reaction";
import User from "./User";

@Entity()
export default class Post extends BaseEntity {
	//Atributes

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@Column({nullable: true})
	imageLink: string;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
	updatedAt: Date;

	// Relationships

    @ManyToOne(() => User, (user) => user.posts, {cascade: ["remove"]})
    @JoinColumn({ name: "user_id" })
	user: User;

	// @OneToMany(() => Reaction, (reaction) => reaction.post)
	// reactions: Reaction[];

	// @OneToMany(() => Comment, (comment) => comment.post)
	// comments: Comment[];
}
