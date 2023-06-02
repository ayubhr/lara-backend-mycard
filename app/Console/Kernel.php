<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\BetslipsCorrection::class,
        Commands\BetslipsValidate::class,

    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule){

       //everyTwoMinutes
       //$schedule->command('betslips:validate')->name('validateBetslipo')->withoutOverlapping(8)->cron('*/8 * * * *');
       //$schedule->command('betslips:correction')->name('CorrectBetslip')->withoutOverlapping(5)->cron('*/7 * * * *');

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands(){

        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');

    }
}
