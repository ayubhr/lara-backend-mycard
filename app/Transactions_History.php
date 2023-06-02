<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions_History extends Model
{

    protected $table = 'transactions__histories';

    protected $primaryKey = 'id';

    protected $fillable = ['parent', 'account', 'sign', 'amount', 'parent_balance', 'created_at'];

}
