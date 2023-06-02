<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReservedBetslip extends Model{


    protected $table = 'reserved_betslip';

    protected $primaryKey = 'id';

    protected $fillable = ['coupon_code', 'evt_count', 'stake', 'coef', 'gain', 'gainMax', 'prime', 'json', 'created_at', 'updated_at'];


}
