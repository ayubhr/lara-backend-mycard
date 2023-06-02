<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gratortransaction extends Model{

    protected $table = 'slotegrator_tr';

    protected $primaryKey = 'id';

    protected $fillable = ['type', 'user', 'amount', 'game_uuid', 'transaction_id', 'created_at', 'updated_at'];


}
