const UserModel = require("../Models/User");

const addJob = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          jobs: body,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Job added successfully!!",
      success: true,
      data: userData?.jobs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};

const fetchJobs = async (req, res) => {
  const { _id } = req.user;
  const { sortOrder = "desc", status, search } = req.query;

  try {
    const userData = await UserModel.findById(_id).select("jobs");
    if (!userData) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    let filteredJobs = userData.jobs;

    if (status && status !== "All") {
      filteredJobs = filteredJobs.filter((job) => job.status === status);
    }

    if (search) {
      const keyword = search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(keyword) ||
          job.companyName.toLowerCase().includes(keyword)
      );
    }

    filteredJobs.sort((a, b) => {
      const dateA = new Date(a.applicationDate);
      const dateB = new Date(b.applicationDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: filteredJobs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
};

const deleteJob = async (req, res) => {
  const { _id } = req.user;
  const { jobId } = req.params;
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      {
        $pull: {
          jobs: { _id: jobId },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Job Deleted Successfully",
      success: true,
      data: userData?.jobs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};

const editJob = async (req, res) => {
  const { _id } = req.user; // user ID
  const { jobId } = req.params; // job ID to update
  const updateData = req.body; // fields to update (e.g. { status: "Interview", position: "Frontend Dev" })

  try {
    // Find the user by _id and update the job inside the jobs array matching jobId
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id, "jobs._id": jobId }, // filter user and job inside jobs array
      {
        $set: Object.fromEntries(
          Object.entries(updateData).map(([key, value]) => [
            `jobs.$.${key}`,
            value,
          ])
        ),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      success: true,
      data: updatedUser.jobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
};

const jobSummary = async (req, res) => {
  const _id = req.user;
  try {
    const userData = await UserModel.findById(_id).select("jobs");

    if (!userData) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const jobs = userData.jobs;

    const statusCount = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});

    const totalJobs = jobs.length;
    return res.status(200).json({
      message: "Jobs Detailed Data fetched successfully",
      success: true,
      data: {
        totalJobs,
        statusCount
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
};

const deleteAllJobs = async (req, res) => {
  const { _id } = req.user;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $set: { jobs: [] } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs deleted successfully",
      success: true,
      data: updatedUser.jobs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
};


module.exports = {
  addJob,
  fetchJobs,
  deleteJob,
  editJob,
  jobSummary,
  deleteAllJobs
};
