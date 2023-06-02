<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportedBetslips extends Model
{

    protected $table = 'reported_betslips';

    protected $primaryKey = 'id';

    protected $fillable = ['coupon', 'player', 'details', 'reporter', 'state', 'created_at', 'updated_at'];

}
