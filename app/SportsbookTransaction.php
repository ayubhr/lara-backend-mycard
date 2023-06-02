<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SportsbookTransaction extends Model{

    protected $table = 'sportsbook_transactions';

    protected $primaryKey = 'id';

    protected $fillable = ['action', 'transaction_id', 'session_id', 'amount', 'type', 'betslip_id', 'user', 'created_at'];


}
