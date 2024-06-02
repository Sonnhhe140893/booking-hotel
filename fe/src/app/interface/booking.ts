export interface Booking {
    user_id:string  ;
    room_id: string;
    discount_id:string;
	discount_code:string;
	discount:number;
    status: string;
	status_payment:string;
	price:number;
	total_money:number;
	amount_of_people:number;
    payment_type:number;
	note:string;
	check_in:string;
	check_out:string;
	customer_name:string;
	customer_email:string;
	customer_phone:string;
	updated_by:string;
}
