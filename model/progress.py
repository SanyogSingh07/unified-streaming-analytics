from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn, TimeRemainingColumn
from rich.console import Console

console = Console()

def get_training_progress_bar():
    return Progress(
        SpinnerColumn(spinner_name="dots", style="red"),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(bar_width=30, style="grey37", complete_style="red"),
        TaskProgressColumn(),
        TimeRemainingColumn(),
        console=console
    )

def show_step_spinner(description):
    progress = Progress(
        SpinnerColumn(spinner_name="aesthetic", style="bold red"),
        TextColumn("[bold white]{task.description}"),
        console=console
    )
    task_id = progress.add_task(description=description, total=None)
    return progress, task_id
