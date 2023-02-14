CREATE TABLE public.course (
	"id" uuid NOT NULL,
	"course_code" varchar(10) NOT NULL,
	"name" varchar(250) NULL,
	"total_hours_week" int4 NULL,
	"creation_user" varchar(64) NOT NULL,
	"creation_date" timestamptz(6) NOT NULL,
	"update_user" varchar(64) NOT NULL,
	"update_date" timestamptz(6) NOT NULL,
	CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);
CREATE INDEX course_idx ON public.course ("course_code");

CREATE TABLE public.teacher (
	"id" uuid NOT NULL,
	"identification" int4 NULL,
	"name" varchar(250) NULL,
	"lastname" varchar(250) NULL,
	"contract_type" varchar(50) NULL,
	"available_hours" int4 NULL,
	"assigned_courses" text NULL,	
	"is_active" bool NULL,	
	"creation_user" varchar(64) NOT NULL,
	"creation_date" timestamptz(6) NOT NULL,
	"update_user" varchar(64) NOT NULL,
	"update_date" timestamptz(6) NOT NULL,
	CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);
CREATE INDEX teacher_idx ON public.teacher ("identification");

CREATE TABLE public.auth_user (
	"id" uuid NOT NULL,
	"username" varchar(250) NULL,
	"password" varchar(250) NULL,
	CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);
CREATE INDEX auth_user_idx ON public.auth_user ("id");